import { PAGINATION_QUERY } from "../components/PaginationComponent";

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // Read numbers of the items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if there are existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // If
      //   There are items
      //  AND There aren't enough items to satisfy how many were requested
      // AND We are on the last page
      // JUST RETURN THEM
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        // We don't have items, fetch them from network
        return false;
      }

      if (items.length) {
        return items;
      }

      return false;
    },
    merge(existing = [], incoming, { args }) {
      const { skip, first } = args;
      // This runs after network request
      const merged = [...existing];
      for (let i = 0; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
