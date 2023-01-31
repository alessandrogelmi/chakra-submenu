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
    isVisible: true,
  },
  {
    title: 'Impostazioni',
    handleClick: () => console.log('Impostazioni'),
    isVisible: true,
  },
  {
    title: 'Opzioni',
    isVisible: true,
    hasSubMenu: true,
    options: [
      {
        title: 'Esci',
        handleClick: () => console.log('Esci'),
        isVisible: true,
      },
      {
        title: 'Cambia Password',
        handleClick: () => console.log('Cambio Password'),
        isVisible: true,
      },
    ],
  },
  {
    title: 'Area Riservata',
    isVisible: true,
    options: [
      {
        title: 'Area Protetta',
        handleClick: () => console.log('Area Protetta'),
        isVisible: true,
      },
      {
        title: 'Elimina account',
        handleClick: () => console.log('Elimina account'),
        isVisible: true,
      },
      {
        title: 'Admin',
        isVisible: false,
      },
    ],
  },
];
