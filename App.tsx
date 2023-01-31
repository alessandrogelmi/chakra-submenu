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
import CustomDivider from './CustomDivider';

interface ProfileMenuProps {
  menuOptions: MenuListProps[];
}

const ProfileMenu = ({ menuOptions }: ProfileMenuProps) => {
  const initialRef = React.useRef(null);
  return (
    <HoverMenu initialFocusRef={initialRef}>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
      ></MenuButton>
      <MenuList color="black">
        {menuOptions?.map((item) => {
          if (!item.isVisible) return null;
          if (item.hasSubMenu) {
            return <MenuItem as={SubMenu} item={item}></MenuItem>;
          }
          if (item.options) {
            return renderGroup(item);
          }
          return renderItem(item);
        })}
      </MenuList>
    </HoverMenu>
  );
};

const renderItem = (item) => {
  if (!item.isVisible) return null;
  return <MenuItem onClick={item.handleClick}>{item.title}</MenuItem>;
};

const renderGroup = (item) => {
  const { title, options } = item;
  if (options.length === 0 || !item.isVisible) return null;
  return (
    <Flex flexDir="column">
      {title && <CustomDivider title={title} />}
      {options.map((opt) => {
        if (!opt.isVisible) return null;
        return renderItem(opt);
      })}
    </Flex>
  );
};

interface SubMenuProps extends MenuButtonProps {
  title: string;
  options: MenuListProps[];
}

const SubMenu = forwardRef<SubMenuProps, 'div'>(({ item, ...props }, ref) => {
  return (
    <HoverMenu>
      <SubMenuButton {...props}>{item.title}</SubMenuButton>
      <SubMenuList>
        {item.options.map((subOption, index) => {
          return renderItem(subOption);
        })}
      </SubMenuList>
    </HoverMenu>
  );
});

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
