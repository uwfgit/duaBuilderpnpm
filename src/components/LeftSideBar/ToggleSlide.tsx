import React from "react";
import type { FC } from "react";
import { clsxm } from '../../helper/helper';

// 临时的 MotionButtonBase 组件
const MotionButtonBase: FC<{
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}> = ({ className, onClick, children }) => (
    <button className={className} onClick={onClick}>
        {children}
    </button>
);

// 简单的 Tooltip 组件 - 专门为 ToggleSlide 设计
const SimpleTooltip: FC<{
    children: React.ReactNode;
    content: React.ReactNode;
}> = ({ children, content }) => (
    <div className="relative group">
        {children}
        <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-gray-100 text-gray-700 text-xs rounded-md px-3 py-2 z-10 shadow-sm border border-gray-200 transition-all duration-200 ease-out left-full ml-2 -top-1 transform translate-y-1 group-hover:translate-y-0 whitespace-nowrap">
            {content}
        </div>
    </div>
);

const collapseClassName =
    'h-3 w-1 rounded-full duration-200 bg-gray-400 group-hover:bg-zinc-600';

// 切换按钮组件
export const ToggleSlide: FC<{
    style: React.CSSProperties;
    defaultDir: 'left' | 'right';
    collapsed: boolean;
    setCollapse: (collapsed: boolean) => void;
    tip: string;
}> = ({ style, defaultDir, collapsed, setCollapse, tip }) => {
    return (
        <div
            className="absolute group flex h-[72px] w-8 items-center justify-center duration-200"
            style={style}
        >
            <SimpleTooltip content={tip}>
                <MotionButtonBase
                    className={clsxm(
                        'flex h-6 w-6 flex-col items-center',
                        defaultDir === 'left' ? '' : 'rotate-180',
                    )}
                    onClick={() => {
                        setCollapse(!collapsed);
                    }}
                >
                    <div
                        className={clsxm(
                            collapseClassName,
                            'translate-y-[0.15rem]',
                            !collapsed
                                ? 'group-hover:rotate-[15deg]'
                                : 'group-hover:rotate-[-15deg]',
                        )}
                    ></div>
                    <div
                        className={clsxm(
                            collapseClassName,
                            'group-hover:rotate-[-15deg]',
                            collapsed
                                ? 'group-hover:rotate-[15deg]'
                                : 'group-hover:rotate-[-15deg]',
                        )}
                    ></div>
                </MotionButtonBase>
            </SimpleTooltip>
        </div>
    );
}; 