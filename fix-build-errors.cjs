const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = process.cwd();
const crPath = path.join(
    root,
    "src/app/crportal/CRPortalView.tsx"
);

let cr = fs.readFileSync(crPath, "utf8");

function replaceOnce(text, before, after) {
    if (text.split(before).length !== 2) {
        throw new Error(
            "Expected exactly one match for: " + before
        );
    }

    return text.replace(before, after);
}

// Move theme hooks to the top of their components.
for (const name of [
    "CreateAssignmentModal",
    "CreateAnnouncementModal",
]) {
    const start = cr.indexOf("function " + name + "(");

    if (start < 0) {
        throw new Error("Missing component: " + name);
    }

    let end = cr.indexOf("\nfunction ", start + 1);

    if (end < 0) {
        end = cr.length;
    }

    const original = cr.slice(start, end);

    let block = original.replace(
        /^[ \t]*const \{ theme \} = useTheme\(\);\r?\n[ \t]*const c = tok\(theme\);\r?\n/gm,
        ""
    );

    const signature =
        "function " +
        name +
        "({ onClose }: { onClose: () => void }) {";

    block = replaceOnce(
        block,
        signature,
        signature +
        "\n  const { theme } = useTheme();" +
        "\n  const c = tok(theme);"
    );

    cr = cr.slice(0, start) + block + cr.slice(end);
}

// Move quick-action hover state outside the map callback.
if (!cr.includes("const [hoveredAction, setHoveredAction]")) {
    cr = replaceOnce(
        cr,
        "function CRDashboardHome() {",
        "function CRDashboardHome() {\n" +
        "  const [hoveredAction, setHoveredAction] = " +
        "useState<string | null>(null);"
    );
}

const mapStart = cr.indexOf("{quickActions.map((a) => {");
const mapEnd = cr.indexOf("})}", mapStart);

if (mapStart < 0 || mapEnd < 0) {
    throw new Error("Quick actions block not found");
}

let quick = cr.slice(mapStart, mapEnd);

if (quick.includes("const [hov, setHov] = useState(false);")) {
    quick = replaceOnce(
        quick,
        "const [hov, setHov] = useState(false);",
        "const hov = hoveredAction === a.label;"
    );

    quick = replaceOnce(
        quick,
        "onMouseEnter={() => setHov(true)}",
        "onMouseEnter={() => setHoveredAction(a.label)}"
    );

    quick = replaceOnce(
        quick,
        "onMouseLeave={() => setHov(false)}",
        "onMouseLeave={() => setHoveredAction(null)}"
    );
}

cr = cr.slice(0, mapStart) + quick + cr.slice(mapEnd);

function filesIn(folder) {
    return fs
        .readdirSync(folder, { withFileTypes: true })
        .flatMap((entry) => {
            const file = path.join(folder, entry.name);

            if (entry.isDirectory()) {
                return filesIn(file);
            }

            return file.endsWith(".tsx") ? [file] : [];
        });
}

// Prepare all changes before writing any files.
const changes = [];

for (const file of filesIn(path.join(root, "src"))) {
    const original = fs.readFileSync(file, "utf8");
    let source = file === crPath ? cr : original;

    const ast = ts.createSourceFile(
        file,
        source,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX
    );

    if (ast.parseDiagnostics.length) {
        throw new Error("Existing syntax error in " + file);
    }

    const edits = [];

    function visit(node) {
        if (ts.isJsxText(node)) {
            const text = source.slice(node.pos, node.end);

            const fixed = text
                .replace(/'/g, "&apos;")
                .replace(/"/g, "&quot;");

            if (fixed !== text) {
                edits.push({
                    start: node.pos,
                    end: node.end,
                    fixed,
                });
            }
        }

        ts.forEachChild(node, visit);
    }

    visit(ast);

    // Apply from the end so earlier positions remain valid.
    edits.sort((a, b) => b.start - a.start);

    for (const edit of edits) {
        source =
            source.slice(0, edit.start) +
            edit.fixed +
            source.slice(edit.end);
    }

    if (source !== original) {
        changes.push({ file, original, source });
    }
}

const backup = path.join(
    root,
    ".unilink-backups",
    Date.now().toString()
);

for (const change of changes) {
    const relative = path.relative(root, change.file);
    const saved = path.join(backup, relative + ".bak");

    fs.mkdirSync(path.dirname(saved), { recursive: true });
    fs.writeFileSync(saved, change.original);
    fs.writeFileSync(change.file, change.source);

    console.log("Fixed:", relative);
}

console.log("Done. Updated files:", changes.length);

if (changes.length) {
    console.log("Backups:", backup);
}