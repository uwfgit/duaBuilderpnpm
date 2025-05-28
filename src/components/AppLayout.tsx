import React, { 
    useState, 
    useRef, 
    useContext, 
    createContext
} from "react";
import type { FC, PropsWithChildren, MutableRefObject } from "react";
import { NavigationPanel } from './LeftSideBar/NavigationPanel';
import { ToggleSlide } from './LeftSideBar/ToggleSlide';

// 侧边栏容器组件
const LeftSidebar: FC<{ width: number }> = ({ width }) => (
    <div style={{ width }} className="bg-gray-50">
        <NavigationPanel width={width} />
    </div>
);

// 创建主页面的上下文
const LayoutMainContainerContext = createContext(
    null as MutableRefObject<HTMLElement> | null,
);

// 使用这个上下文的 hook
export const useLayoutMainContainerRef = () =>
    useContext(LayoutMainContainerContext);

// 主要的应用布局组件
export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const sidebarWidth = sidebarCollapsed ? 0 : 280;
    const mainRef = useRef<HTMLElement>(null!);

    return (
        <div className="relative text-black dark:text-white/90 h-[calc(100vh-48px)]">
            {/* 左侧边栏 */}
            <LeftSidebar width={sidebarWidth} />
            
            {/* 侧边栏切换按钮 */}
            <ToggleSlide
                tip={sidebarCollapsed ? 'Open Sidebar' : 'Close Sidebar'}
                collapsed={sidebarCollapsed}
                setCollapse={setSidebarCollapsed}
                defaultDir="left"
                style={{
                    left: `${sidebarWidth}px`,
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
            />
            
            {/* 主内容区域 */}
            <LayoutMainContainerContext.Provider value={mainRef}>
                <main
                    id="main-message-container"
                    style={{
                        marginLeft: `${sidebarWidth}px`,
                    }}
                    className="px-[80px] duration-200 h-full overflow-auto"
                    ref={mainRef}
                >
                    {children}
                </main>
            </LayoutMainContainerContext.Provider>
        </div>
    );
}; 