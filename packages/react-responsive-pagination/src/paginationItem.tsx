export type PaginationItem = {
  type: 'page' | 'ellipsis' | 'next' | 'previous';
  key: string;
  page?: number;
  label: string;
  active?: boolean;
  a11yLabel?: string;
  a11yHidden?: boolean;
};

export type NavType = 'next' | 'previous';

export type EllipsisPosition = 'left' | 'right';

export function createNavItem(type: NavType, page?: number): PaginationItem {
  return {
    type,
    key: page === undefined ? type : `${type}_disabled`,
    label: type === 'previous' ? '«' : '»',
    a11yLabel: type === 'previous' ? 'Previous' : 'Next',
    page,
  };
}

export function createPageItem(page: number, active: boolean): PaginationItem {
  return {
    type: 'page',
    key: active ? `page_${page}` : `active_${page}`,
    label: page.toString(),
    a11yLabel: active ? '(current)' : undefined,
    page,
    active,
  };
}

export function createEllipsisItem(position: EllipsisPosition): PaginationItem {
  return {
    type: 'ellipsis',
    key: `ellipsis_${position}`,
    label: '…',
    a11yHidden: true,
  };
}
