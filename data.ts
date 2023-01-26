export interface MenuListProps {
  title?: string;
  iconName?: string;
  handleClick?: () => void;
  isVisible?: boolean;
  isDisabled?: boolean;
  iconColor?: string;
  textColor?: string;
  options?: MenuListProps[];
  hasSubMenu?: boolean;
}

export const data: MenuListProps[] = [
  {
    title: 'Profilo',
  },
  {
    title: 'Impostazioni',
  },
  {
    title: 'Opzioni',
    hasSubMenu: true,
    options: [
      {
        title: 'Esci',
      },
      {
        title: 'Cambia Password',
      },
    ],
  },
];
