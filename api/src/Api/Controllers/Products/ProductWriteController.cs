using System.ComponentModel.DataAnnotations;
using API.src.Application.Commands.Products.CreateProduct;
using API.src.Application.Commands.Products.DeleteProduct;
using API.src.Application.Commands.Products.UpdateProduct;
using API.src.Application.Common.DTOs.Products;
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
        public async Task<ActionResult<ProductResponseDto>> CreateProductAsync([FromForm] CreateProductRequest request)
        {
            var command = new CreateProductCommand
            {
                Title = request.Title,
                Description = request.Description,
                Price = request.Price,
                Images = request.Images,
                Category = request.Category,
                IsFeatured = request.IsFeatured,
                Stock = request.Stock
            };

            var createdProduct = await _mediator.Send(command);

            return CreatedAtRoute(
                "GetProductById",
                new { id = createdProduct.Id },
                createdProduct
            );
        }

        // DELETE /api/products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductAsync([FromRoute] string id)
        {
            var command = new DeleteProductCommand { ProductId = id };
            await _mediator.Send(command);
            return NoContent();
        }

        // PATCH /api/products/{id}
        [HttpPatch("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateProductAsync([FromForm] UpdateProductRequest request, [FromRoute] string id)
        {
            var command = new UpdateProductCommand
            {
                ProductId = id,
                Title = request.Title,
                Description = request.Description,
                Price = request.Price,
                AddImages = request.AddImages,
                RemoveImageUrls = request.RemoveImageUrls,
                Category = request.Category,
                IsFeatured = request.IsFeatured,
                Stock = request.Stock
            };

            await _mediator.Send(command);
            return Ok();

        }
    }

    // Request DTOs
    public record CreateProductRequest
    {
        [Required]
        public string Title { get; init; } = string.Empty;
        [Required]
        public string Description { get; init; } = string.Empty;
        [Range(0.01, 9999.99)]
        public decimal Price { get; init; }
        [Required]
        public List<IFormFile> Images { get; init; } = new();
        [Required]
        public string Category { get; init; } = string.Empty;
        public bool IsFeatured { get; init; } = false; // Default
        [Range(1, 9999)]
        public int Stock { get; init; }
    }

    public record UpdateProductRequest
    {
        public string? Title { get; init; }
        public string? Description { get; init; }
        [Range(0.01, 9999.99)]
        public decimal? Price { get; init; }
        public List<IFormFile>? AddImages { get; init; }
        public List<string>? RemoveImageUrls { get; init; }
        public string? Category { get; init; }
        public bool? IsFeatured { get; init; }
        [Range(1, 9999)]
        public int? Stock { get; init; }
    }
}