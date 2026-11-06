"use client";
import {createContext,useContext} from 'react';
export const PortalAccess=createContext<'student'|'cr'>('student');
export function usePortalCanManage(serverAllows:boolean){return useContext(PortalAccess)==='cr'&&serverAllows;}
