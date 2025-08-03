using API.src.Application.DTOs.Queries;
using API.src.Application.Queries.Products;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

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
        public async Task<ActionResult<ProductResponseDto>> GetProductByIdAsync([FromRoute] string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException("Product ID is required.");

            if (!ObjectId.TryParse(id, out _))
                throw new ArgumentException("Product ID doesn't match required format.");

            var query = new GetProductByIdQuery { ProductId = id };
            var result = await _mediator.Send(query);

            return Ok(result);
        }
    }
}