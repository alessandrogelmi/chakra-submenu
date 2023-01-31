import { createContext, Dispatch, forwardRef, SetStateAction } from 'react';
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

export const SubMenuButton = forwardRef<MenuButtonProps, any>(
  (props: any, ref) => {
    function onClick(event: any) {
      event.stopPropagation();
    }

    const buttonProps = useMenuButton(props, ref);

    return <MenuItem {...buttonProps} onClick={onClick} />;
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
        offset={parentMenu ? [0, 1] : [0, 0]}
        placement={parentMenu ? 'right-start' : 'bottom-end'}
        isLazy
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

export const SubMenuList = forwardRef<MenuListProps, any>(
  (props: any, ref: any) => {
    return (
      <MenuList
        border="0"
        boxShadow="0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1)"
        ref={ref}
        {...props}
      />
    );
  }
);
