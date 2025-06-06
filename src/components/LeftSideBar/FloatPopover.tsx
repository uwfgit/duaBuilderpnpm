'use client';

import {
    autoUpdate,
    flip,
    offset,
    shift,
    useFloating,
} from '@floating-ui/react-dom';
import React, {
    createContext,
    createElement,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { AnimatePresence, m } from 'framer-motion';
import type { UseFloatingOptions } from '@floating-ui/react-dom';
import type { FC, PropsWithChildren, ReactElement } from 'react';

// import { microReboundPreset } from '~/constants/spring';
// import useClickAway from '~/hooks/common/use-click-away';
// import { useEventCallback } from '~/hooks/common/use-event-callback';
import { clsxm } from '../../helper/helper';

// import { RootPortal } from '../portal';

// 临时的常量和hooks
const microReboundPreset = {
    type: "spring",
    damping: 10,
    stiffness: 100
};

const useClickAway = (ref: React.RefObject<HTMLElement | null>, callback: () => void) => {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [ref, callback]);
};

const useEventCallback = (callback: () => void) => {
    return useCallback(callback, [callback]);
};

const RootPortal: FC<{ children: React.ReactNode; to?: HTMLElement }> = ({ children }) => (
    <div>{children}</div>
);

type FloatPopoverProps<T> = PropsWithChildren<{
    triggerElement?: string | ReactElement;
    TriggerComponent?: FC<T>;

    headless?: boolean;
    wrapperClassName?: string;
    trigger?: 'click' | 'hover' | 'both';
    padding?: number;
    offset?: number;
    popoverWrapperClassNames?: string;
    popoverClassNames?: string;

    triggerComponentProps?: T;
    /**
     * 不消失
     */
    debug?: boolean;

    animate?: boolean;

    as?: keyof HTMLElementTagNameMap;

    /**
     * @default popover
     */
    type?: 'tooltip' | 'popover';
    isDisabled?: boolean;

    to?: HTMLElement;

    onOpen?: () => void;
    onClose?: () => void;

    asChild?: boolean;
}> &
    UseFloatingOptions;

const PopoverActionContext = createContext<{
    close: () => void;
}>(null!);

export const usePopoverAction = () => useContext(PopoverActionContext);

export const FloatPopover = function FloatPopover<T extends {}>(props: FloatPopoverProps<T>) {
    // 传入参数 props 的解构
    const {
        headless = false,
        wrapperClassName: wrapperClassNames,
        TriggerComponent,
        triggerElement,
        trigger = 'hover',
        padding,
        offset: offsetValue,
        popoverWrapperClassNames,
        popoverClassNames,
        debug,
        animate = true,
        as: As = 'div',
        type = 'popover',
        triggerComponentProps,
        isDisabled,
        onOpen,
        onClose,
        to,
        asChild,
        ...floatingProps
    } = props;

    const [open, setOpen] = useState(false);
    const { x, y, refs, strategy, isPositioned, elements, update } =
        useFloating({
            middleware: floatingProps.middleware ?? [
                flip({ padding: padding ?? 20 }),
                offset(offsetValue ?? 10),
                shift(),
            ],
            strategy: floatingProps.strategy,
            placement: floatingProps.placement ?? 'bottom-start',
            whileElementsMounted: floatingProps.whileElementsMounted,
        });

    useEffect(() => {
        if (open && elements.reference && elements.floating) {
            const cleanup = autoUpdate(
                elements.reference,
                elements.floating,
                update,
            );
            return cleanup;
        }
    }, [open, elements, update]);

    const containerRef = useRef<HTMLDivElement>(null);

    useClickAway(containerRef, () => {
        if (trigger == 'click' || trigger == 'both') {
            doPopoverDisappear();
        }
    });

    const doPopoverDisappear = useCallback(() => {
        if (debug) {
            return;
        }
        setOpen(false);
    }, [debug]);

    const doPopoverShow = useEventCallback(() => {
        if (isDisabled) return;
        setOpen(true);
    });

    const handleMouseOut = useCallback(() => {
        doPopoverDisappear();
    }, [doPopoverDisappear]);

    const listener = useMemo(() => {
        const baseListener = {
            // onFocus: doPopoverShow,
            // onBlur: doPopoverDisappear,
        };
        switch (trigger) {
            case 'click':
                return {
                    ...baseListener,
                    onClick: doPopoverShow,
                };
            case 'hover':
                return {
                    ...baseListener,
                    onMouseOver: doPopoverShow,
                    onMouseOut: doPopoverDisappear,
                };
            case 'both':
                return {
                    ...baseListener,
                    onClick: doPopoverShow,
                    onMouseOver: doPopoverShow,
                    onMouseOut: handleMouseOut,
                };
        }
    }, [doPopoverDisappear, doPopoverShow, handleMouseOut, trigger]);

    const Child = triggerElement ? (
        triggerElement
    ) : TriggerComponent ? (
        React.cloneElement(
            createElement(TriggerComponent as any, triggerComponentProps),

            {
                tabIndex: 0,
            },
        )
    ) : (
        <></>
    );
    const TriggerWrapper = asChild ? (
        React.cloneElement(
            typeof Child === 'string' ? <span>{Child}</span> : Child,
            {
                ...listener,
                ref: refs.setReference,
            },
        )
    ) : (
        <As
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            role={trigger === 'both' || trigger === 'click' ? 'button' : 'note'}
            className={clsxm('inline-block', wrapperClassNames)}
            ref={refs.setReference}
            {...listener}
        >
            {Child}
        </As>
    );

    useEffect(() => {
        if (refs.floating.current && open && type === 'popover') {
            refs.floating.current.focus();
        }
    }, [open]);

    useEffect(() => {
        if (open) {
            onOpen?.();
        } else {
            onClose?.();
        }
    }, [open]);
    const actionCtxValue = useMemo(() => {
        return { close: doPopoverDisappear };
    }, [doPopoverDisappear]);

    if (!props.children) {
        return TriggerWrapper;
    }

    return (
        <>
            {TriggerWrapper}

            <AnimatePresence>
                {open && (
                    <RootPortal to={to}>
                        <m.div
                            className={clsxm(
                                'float-popover',
                                'relative z-[99]',
                                popoverWrapperClassNames,
                            )}
                            {...(trigger === 'hover' || trigger === 'both'
                                ? listener
                                : {})}
                            ref={containerRef}
                        >
                            <m.div
                                tabIndex={-1}
                                role={type === 'tooltip' ? 'tooltip' : 'dialog'}
                                className={clsxm(
                                    !headless && [
                                        'shadow-out-sm focus:!shadow-out-sm focus-visible:!shadow-out-sm',
                                        'rounded-xl border border-zinc-400/20 p-4 shadow-lg outline-none backdrop-blur-lg dark:border-zinc-500/30',
                                        'bg-zinc-50/80 dark:bg-neutral-900/80',
                                    ],

                                    'relative z-[2]',

                                    type === 'tooltip'
                                        ? `max-w-[25rem] break-all rounded-xl px-2 py-1 !shadow-none text-sm`
                                        : '',
                                    'text-black dark:!text-white',
                                    popoverClassNames,
                                )}
                                ref={refs.setFloating}
                                initial={{ translateY: '10px', opacity: 0 }}
                                animate={{ translateY: '0px', opacity: 1 }}
                                exit={{ translateY: '10px', opacity: 0 }}
                                transition={microReboundPreset}
                                style={{
                                    position: strategy,
                                    top: y ?? '',
                                    left: x ?? '',
                                    visibility:
                                        isPositioned && x !== null
                                            ? 'visible'
                                            : 'hidden',
                                }}
                            >
                                <PopoverActionContext.Provider
                                    value={actionCtxValue}
                                >
                                    {props.children}
                                </PopoverActionContext.Provider>
                            </m.div>
                        </m.div>
                    </RootPortal>
                )}
            </AnimatePresence>
        </>
    );
};
