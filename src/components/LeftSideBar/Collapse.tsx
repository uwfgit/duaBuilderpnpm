import * as React from 'react';
import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import type { Variants, Spring } from 'framer-motion';
import type { FC, PropsWithChildren } from 'react';

// 折叠的箭头
import { IonIosArrowDown } from '../Icons/arrow';
import { clsxm } from '../../helper/helper';

// 定义Component类型
type Component<T = {}> = FC<PropsWithChildren<T & { className?: string }>>;

const microReboundPreset: Spring = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
};

export const Collapse: Component<{
    title: React.ReactNode;
    defaultOpened?: boolean;
}> = (props) => {
    const [isOpened, setIsOpened] = React.useState(
        props.defaultOpened ?? false,
    );
    return (
        <div className="flex flex-col">
            <div
                className="flex w-full cursor-pointer items-center justify-between"
                onClick={() => setIsOpened((v) => !v)}
            >
                <span className="w-0 flex-shrink flex-grow truncate">
                    {props.title}
                </span>
                <div
                    className={clsx(
                        'flex-shrink-0 text-gray-400',
                        isOpened && 'rotate-180 transform',
                    )}
                >
                    <IonIosArrowDown isOpened={isOpened} />
                </div>
            </div>
            <CollapseContent isOpened={isOpened}>
                {props.children}
            </CollapseContent>
        </div>
    );
};

export const CollapseContent: Component<{
    isOpened: boolean;
    withBackground?: boolean;
}> = ({
    isOpened,
    className,
    children,

    withBackground = false,
}) => {
    const variants = React.useMemo(() => {
        const v: Variants = {
            open: {
                opacity: 1,
                height: 'auto',
                transition: microReboundPreset,
            },
            collapsed: {
                opacity: 0,
                height: 0,
                overflow: 'hidden',
            },
        };

        if (withBackground) {
            // @ts-expect-error
            v.open.background = `oklch(var(--a) / 10%)`;
            // @ts-expect-error
            v.collapsed.background = `oklch(var(--a) / 0%)`;
        }

        return v;
    }, [withBackground]);
    return (
        <>
            <AnimatePresence initial={false}>
                {isOpened && (
                    <m.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={variants}
                        className={clsxm(
                            withBackground && 'rounded-lg',
                            className,
                        )}
                    >
                        {withBackground ? (
                            <div className="p-4">{children}</div>
                        ) : (
                            children
                        )}
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};
