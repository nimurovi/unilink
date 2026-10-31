const fs = require('fs');
const path = require('path');

const srcPagesDir = 'src/pages';
const appDir = 'src/app';

const toKebabCase = str => str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/\s+/g, '-');

function safeMove(src, dest) {
    if (fs.existsSync(src)) {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        // Add "use client" if not present as these were client side components
        const content = fs.readFileSync(src, 'utf-8');
        if (!content.includes('"use client"') && !content.includes("'use client'")) {
            fs.writeFileSync(dest, '"use client";\n' + content);
        } else {
            fs.writeFileSync(dest, content);
        }
        fs.unlinkSync(src);
        console.log(`Moved ${src} -> ${dest}`);
    }
}

safeMove('src/Dashboard.tsx', path.join(appDir, 'dashboard/page.tsx'));
safeMove('src/LostFound.tsx', path.join(appDir, 'lost-found/page.tsx'));

if (fs.existsSync(srcPagesDir)) {
    const files = fs.readdirSync(srcPagesDir);
    files.forEach(file => {
        if (file.endsWith('.tsx')) {
            const pageName = file.replace('.tsx', '');
            let routeName = toKebabCase(pageName);
            if (routeName === 'c-r-portal') routeName = 'cr-portal';
            // prevent overwrite if we already moved it
            const dest = path.join(appDir, routeName, 'page.tsx');
            if (!fs.existsSync(dest)) {
                safeMove(path.join(srcPagesDir, file), dest);
            } else {
                console.log(`Skipped ${file} as destination exists`);
            }
        }
    });
}
