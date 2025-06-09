using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartDisaster.API.DTOs;
using SmartDisaster.API.Models;
using SmartDisaster.API.Services;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase 
{
    private readonly AppDbContext cs;
    private readonly adminjwttoken j;
    public AdminController(AppDbContext context,adminjwttoken j)
    {
        cs = context;
        this.j = j;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Admin>>> GetAll() => await cs.Admins.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Admin>> GetById(int id)
    {
        var item = await cs.Admins.FindAsync(id);
        return item == null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<Admin>> Create(Admin admin)
    {
        cs.Admins.Add(admin);
        await cs.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = admin.Id }, admin);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Admin admin)
    {
        if (id != admin.Id) return BadRequest();

        cs.Admins.Update(admin);
        await cs.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await cs.Admins.FindAsync(id);
        if (item == null) return NotFound();
        cs.Admins.Remove(item);
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
}
