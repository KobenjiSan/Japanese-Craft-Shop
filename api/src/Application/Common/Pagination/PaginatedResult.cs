namespace API.src.Application.Common.Pagination
{
    public class PaginatedResult<T>
    {
        public List<T> Items { get; set; } = new();
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

        public PaginatedResult(List<T> items, int count, int page, int pageSize)
        {
            Items = items;
            TotalItems = count;
            CurrentPage = page;
            PageSize = pageSize;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        }
    }
}