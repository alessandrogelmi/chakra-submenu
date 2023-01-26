// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getNextIndex,
  getPrevIndex,
  normalizeEventKey,
} from '@chakra-ui/utils';
import {
  createContext,
  Dispatch,
  forwardRef,
  SetStateAction,
  useCallback,
  useContext,
  KeyboardEvent,
} from 'react';
import {
  MenuButtonProps,
  useMenuContext,
  useMenuButton,
  Menu,
  MenuItem,
  MenuProps,
  Box,
  BoxProps,
  MenuListProps,
  MenuList,
} from '@chakra-ui/react';
import React, { useState } from 'react';

type ParentMenuContext = ReturnType<typeof useMenuContext> & {
  lastFocusedIndex: number;
  setLastFocusedIndex: Dispatch<SetStateAction<number>>;
  blurAndSaveFocusedIndex: () => void;
  restoreLastFocusedIndex: () => void;
};
const ParentMenuContext = createContext<undefined | ParentMenuContext>(
  undefined
);
const useParentMenuContext = () => useContext(ParentMenuContext);

export const SubMenuButton = forwardRef<MenuButtonProps, 'button'>(
  (props, ref) => {
    const menu = useMenuContext();
    const parentMenu = useParentMenuContext();
    const onKeyDown = useCallback(
      (event: KeyboardEvent<HTMLButtonElement>) => {
        const isSupportedOpeningKey = ['Enter', 'ArrowLeft', ' '].includes(
          normalizeEventKey(event)
        );
        if (isSupportedOpeningKey) {
          event.preventDefault();
          event.stopPropagation();
          parentMenu?.blurAndSaveFocusedIndex();
          menu.onOpen();
          setTimeout(() => {
            menu.setFocusedIndex(1);
          }, 10);
        }
      },
      [parentMenu, menu]
    );

    function onClick(event: MouseEvent) {
      event.stopPropagation();
    }

    const buttonProps = useMenuButton(props, ref);

    return (
      <MenuItem
        ref={ref}
        {...props}
        {...buttonProps}
        onClick={onClick}
        onKeyDownCapture={onKeyDown}
      />
    );
  }
);

export function HoverMenu({ children, ...props }: MenuProps) {
  const parentMenu = useMenuContext();
  const [lastFocusedIndex, setLastFocusedIndex] = useState(-1);
  function blurAndSaveFocusedIndex() {
    setLastFocusedIndex(parentMenu.focusedIndex);
    parentMenu?.setFocusedIndex(-1);
  }
  function restoreLastFocusedIndex() {
    parentMenu?.setFocusedIndex(lastFocusedIndex);
  }

  return (
    <ParentMenuContext.Provider
      value={{
        ...parentMenu,
        lastFocusedIndex,
        setLastFocusedIndex,
        blurAndSaveFocusedIndex,
        restoreLastFocusedIndex,
      }}
    >
      <Menu
        offset={parentMenu ? [-8, -4] : [0, 0]}
        placement={parentMenu ? 'right-start' : 'bottom-end'}
        {...props}
      >
        {(...args) => (
          <HoverMenuInner>
            {typeof children === 'function' ? children(...args) : children}
          </HoverMenuInner>
        )}
      </Menu>
    </ParentMenuContext.Provider>
  );
}

function HoverMenuInner(props: BoxProps) {
  const menu = useMenuContext();
  return (
    <Box {...props} onMouseEnter={menu.onOpen} onMouseLeave={menu.onClose} />
  );
}

export const SubMenuList = forwardRef<MenuListProps, 'button'>((props, ref) => {
  const subMenu = useMenuContext();
  const parentMenu = useParentMenuContext();
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const key = normalizeEventKey(event);
      const isSupportedClosingKey = ['Escape', 'ArrowRight'].includes(key);
      if (isSupportedClosingKey) {
        event.preventDefault();
        event.stopPropagation();
        subMenu.onClose();
        setTimeout(() => {
          parentMenu?.restoreLastFocusedIndex();
        }, 100);
        return;
      }

      if (key === 'ArrowDown') {
        event.preventDefault();
        event.stopPropagation();
        const nextIndex = getNextIndex(
          subMenu.focusedIndex,
          subMenu.domContext.descendants.length
        );
        console.log('nextIndex', nextIndex);
        subMenu.setFocusedIndex(nextIndex);
      }

      if (key === 'ArrowUp') {
        event.preventDefault();
        event.stopPropagation();
        const prevIndex = getPrevIndex(
          subMenu.focusedIndex,
          subMenu.domContext.descendants.length
        );
        console.log('prevIndex', prevIndex);
        subMenu.setFocusedIndex(prevIndex);
      }
    },
    [parentMenu, subMenu]
  );

  return <MenuList ref={ref} {...props} onKeyDown={onKeyDown} />;
});
