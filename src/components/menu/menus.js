"use client";
import { useState } from "react";
import Link from "next/link";

export function MainMenu({ menuArray }) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  return (
    <div className="group fixed top-1 left-0 h-[calc(100vh-64px)] z-20 w-[10px] hover:w-[210px] transition-all duration-300 ease-in-out overflow-hidden">
      {/* 左侧触发区域 */}
      <div className="w-[10px] h-full absolute left-0 top-0 z-30" />

      {/* 侧边栏内容容器 */}
      <div className="absolute left-[10px] top-0 w-[200px] h-full">
        {/* 模糊背景层 */}
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm w-full h-full rounded-lg" />

        {/* 侧边栏主体内容 */}
        <div className="relative w-full h-full bg-slate-800 bg-opacity-70 overflow-y-auto rounded-lg">
          {/* Logo 区域 */}
          <div className="flex flex-col items-center p-4">
            <img
              src="/km_logo.png"
              alt="Kernel master"
              className="rounded-full w-16 h-16"
            />
            <h2 className="mt-2 text-white text-lg font-semibold">
              Kernel Master
            </h2>
          </div>

          {/* 菜单项 */}
          <ul className="space-y-2 p-2">
            {menuArray.map((menu) => (
              <li key={menu.id}>
                {/* 一级菜单项 */}
                <div
                  className="flex items-center justify-between p-2 text-white hover:bg-slate-700 rounded-lg cursor-pointer transition-colors duration-200"
                  onClick={() =>
                    setActiveMenuId((prev) =>
                      prev === menu.id ? null : menu.id
                    )
                  }
                >
                  <span>{menu.outerTag}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${
                      activeMenuId === menu.id ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                {/* 二级菜单项 */}
                <ul
                  className={`pl-4 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                    activeMenuId === menu.id ? "max-h-40" : "max-h-0"
                  }`}
                >
                  {menu.innerList.map((subMenu) => (
                    <li key={subMenu.id}>
                      <Link
                        href={subMenu.path}
                        className="flex p-2 text-sm text-gray-300 hover:bg-slate-600 rounded-lg transition-colors"
                      >
                        {subMenu.tag}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
