using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartDisaster.API.DTOs;
using SmartDisaster.API.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using SmartDisaster.API.Services;
using Microsoft.AspNetCore.Authorization;
using SmartDisaster.API.DTOs;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CitizenController : ControllerBase
{
    private readonly AppDbContext cs;
    private readonly userjwttoken j;

    public CitizenController(AppDbContext context,userjwttoken j)
    {
        cs = context;
        this.j = j;
    }




    

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Citizen>>> GetAll() => await cs.Citizens.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Citizen>> GetById(int id)
    {
        var item = await cs.Citizens.FindAsync(id);
        return item == null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<Citizen>> Create(Citizen citizen)
    {
        cs.Citizens.Add(citizen);
        await cs.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = citizen.Id }, citizen);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Citizen citizen)
    {
        if (id != citizen.Id) return BadRequest();
        cs.Entry(citizen).State = EntityState.Modified;
        await cs.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await cs.Citizens.FindAsync(id);
        if (item == null) return NotFound();
        cs.Citizens.Remove(item);
        await cs.SaveChangesAsync();
        return NoContent();
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> LoginUser(LoginRequestdto req)
    {
        var result = await j.Authenticate(req);
        if (result == null)
        {
            return Unauthorized();
        }
        return Ok(result);
    }
    [HttpGet("by-citizen/{citizenId}")]
    public async Task<ActionResult<IEnumerable<citizendto>>> GetAlertsByCitizenId(int citizenId)
    {
        try
        {
            var alerts = await cs.CitizenAlerts
                .FromSqlRaw("EXEC citizendisaster @a = {0}", citizenId)
                .ToListAsync();

            return Ok(alerts);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
