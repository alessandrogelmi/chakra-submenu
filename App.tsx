import {
  ChakraProvider,
  Flex,
  IconButton,
  MenuButton,
  MenuList,
  MenuItem,
  MenuButtonProps,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import * as React from 'react';
import { forwardRef } from 'react';
import { data, MenuListProps } from './data';
import './style.css';
import { HoverMenu, SubMenuButton, SubMenuList } from './SubMenu';

interface ProfileMenuProps {
  menuOptions: MenuListProps[];
}

const ProfileMenu = ({ menuOptions }: ProfileMenuProps) => {
  return (
    <HoverMenu>
      <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />}>
        Profilo
      </MenuButton>
      <MenuList color="black">
        {menuOptions?.map((option) => {
          return option.hasSubMenu ? (
            <MenuItem
              as={SubMenu}
              title={option.title}
              options={option.options}
            ></MenuItem>
          ) : (
            <MenuItem onClick={option.handleClick}>{option.title}</MenuItem>
          );
        })}
      </MenuList>
    </HoverMenu>
  );
};

interface SubMenuProps extends MenuButtonProps {
  title: string;
  options: MenuListProps[];
}

const SubMenu = forwardRef<SubMenuProps, 'div'>(
  ({ title, options, ...props }, ref) => {
    return (
      <HoverMenu>
        <SubMenuButton ref={ref} {...props}>
          {title}
        </SubMenuButton>
        <SubMenuList>
          {options.map((subOption) => {
            return (
              <MenuItem onClick={subOption.handleClick}>
                {subOption.title}
              </MenuItem>
            );
          })}
        </SubMenuList>
      </HoverMenu>
    );
  }
);

export default function App() {
  return (
    <ChakraProvider>
      <Flex
        w="100%"
        alignItems="center"
        p={4}
        justifyContent="flex-end"
        background="#DCDCDC"
      >
        <ProfileMenu menuOptions={data} />
      </Flex>
    </ChakraProvider>
  );
}
