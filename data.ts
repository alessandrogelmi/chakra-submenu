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
    handleClick: () => console.log('Profilo'),
  },
  {
    title: 'Impostazioni',
    handleClick: () => console.log('Impostazioni'),
  },
  {
    title: 'Opzioni',
    hasSubMenu: true,
    options: [
      {
        title: 'Esci',
        handleClick: () => console.log('Esci'),
      },
      {
        title: 'Cambia Password',
        handleClick: () => console.log('Cambio Password'),
      },
    ],
  },
];
