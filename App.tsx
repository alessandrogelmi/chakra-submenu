import {
  ChakraProvider,
  Flex,
  Spacer,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  MenuButtonProps,
} from '@chakra-ui/react';
import * as React from 'react';
import { forwardRef } from 'react';
import { data, MenuListProps } from './data';
import './style.css';
import { HoverMenu, SubMenuButton, SubMenuList } from './SubMenu';

export default function App() {
  return (
    <ChakraProvider>
      <Flex
        h="60px"
        w="100%"
        alignItems="center"
        p={4}
        textStyle="bodySmall"
        // eslint-disable-next-line no-nested-ternary
        background="gray.400"
      >
        <Spacer />
        <ProfileMenu menuOptions={data} />
      </Flex>
    </ChakraProvider>
  );
}

interface ProfileMenuProps {
  menuOptions: MenuListProps[];
}

export const ProfileMenu = ({ menuOptions }: ProfileMenuProps) => {
  return (
    <HoverMenu closeOnSelect={false}>
      <MenuButton as={Button} colorSchema="blue.500">
        My Profile
      </MenuButton>
      <MenuList color="gray.800">
        {menuOptions?.map((option) => {
          return option.hasSubMenu ? (
            <MenuItem as={SubMenu} title="Apri" options={option.options}>
              {' '}
              SubMenu {option.title}{' '}
            </MenuItem>
          ) : (
            <MenuItem>{option.title}</MenuItem>
          );
        })}
      </MenuList>
    </HoverMenu>
  );
};

interface SubMenuProps extends MenuButtonProps {
  title: string;
  options: MenuListProps;
}

const SubMenu = forwardRef<SubMenuProps, 'button'>(
  ({ title, options, ...props }, ref) => {
    return (
      <HoverMenu closeOnSelect={false}>
        <SubMenuButton ref={ref} {...props}>
          {title}
        </SubMenuButton>
        <SubMenuList>
          {options.map((subOption) => {
            return <MenuItem>{subOption.title}</MenuItem>;
          })}
        </SubMenuList>
      </HoverMenu>
    );
  }
);
