using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartDisaster.API.Models;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DisasterIntimationController : ControllerBase
{
    private readonly AppDbContext cs;
    public DisasterIntimationController(AppDbContext context) => cs = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DisasterIntimation>>> GetAll() => await cs.DisasterIntimations.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<DisasterIntimation>> GetById(int id)
    {
        var item = await cs.DisasterIntimations.FindAsync(id);
        return item == null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<DisasterIntimation>> Create(DisasterIntimation d)
    {
        cs.DisasterIntimations.Add(d);
        await cs.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = d.Id }, d);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, DisasterIntimation d)
    {
        if (id != d.Id) return BadRequest();
        cs.Entry(d).State = EntityState.Modified;
        await cs.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await cs.DisasterIntimations.FindAsync(id);
        if (item == null) return NotFound();
        cs.DisasterIntimations.Remove(item);
        await cs.SaveChangesAsync();
        return NoContent();
    }
}
