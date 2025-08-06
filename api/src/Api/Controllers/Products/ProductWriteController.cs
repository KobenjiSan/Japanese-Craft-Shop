using API.src.Application.Commands.Products;
using API.src.Application.DTOs.Products.Commands;
using API.src.Application.DTOs.Responses;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.src.Api.Controllers.Products
{
    [ApiController]
    [Route("api/products")]
    [Authorize(Roles = "Admin")]
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
            var command = new CreateProductCommand
            {
                Title = dto.Title,
                Description = dto.Description,
                Price = dto.Price,
                Images = dto.Images,
                Category = dto.Category,
                IsFeatured = dto.IsFeatured,
                Stock = dto.Stock
            };

            var createdProduct = await _mediator.Send(command);

            return CreatedAtRoute(
                "GetProductById",
                new { id = createdProduct.Id },
                createdProduct
            );
        }
    }
}