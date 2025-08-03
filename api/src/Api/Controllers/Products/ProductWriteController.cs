using API.src.Application.Commands.Products;
using API.src.Application.DTOs.Products.Commands;
using API.src.Application.DTOs.Queries;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.src.Api.Controllers.Products
{
    [ApiController]
    [Route("api/products")]
    public class ProductWriteController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductWriteController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST /api/products
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<ProductResponseDto>> CreateProductAsync([FromForm] CreateProductDto dto)
        {
            var command = dto.Adapt<CreateProductCommand>();

            var createdProduct = await _mediator.Send(command);

            return CreatedAtRoute(
                "GetProductById",   // Note: Not implemented
                new { id = createdProduct.Id },
                createdProduct
            );
        }
    }
}