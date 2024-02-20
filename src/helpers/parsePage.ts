const DEFAULT_PAGE = 1;

export function parsePage(pageStr: string | undefined, defaultPage = DEFAULT_PAGE) {
  if (!pageStr) {
    return defaultPage;
  }

  const parsed = parseInt(pageStr);

  return !isNaN(parsed) ? parsed : defaultPage;
}
