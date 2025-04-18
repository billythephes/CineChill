export interface NavLinkItem {
    id: number;
    slug: string;
    name: string;
}

export interface NavDropdownItem {
    id: number;
    api: string;
    slug: string;
    name: string;
}

export interface Items {
    map(arg0: (item: any) => React.JSX.Element): React.ReactNode;
    _id: string;
    name: string;
    slug: string;
}