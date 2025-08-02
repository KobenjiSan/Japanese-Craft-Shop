using API.src.Application.DTOs.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.src.Api.Controllers.Products
{
    [ApiController]
    [Route("api/products")]
    public class ProductReadController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductReadController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET /api/products/{id}
        [HttpGet("{id}", Name = "GetProductById")]
        public Task<ActionResult<ProductResponseDto>> GetProductByIdAsync([FromRoute] string id) // TODO: async & dto
        {
            throw new NotImplementedException();
        }
    }
}