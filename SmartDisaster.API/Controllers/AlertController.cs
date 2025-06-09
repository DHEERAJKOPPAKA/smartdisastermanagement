using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartDisaster.API.DTOs;
using SmartDisaster.API.Models;

[Authorize]
[ApiController]
[Route("api/alert")]
public class AlertController : ControllerBase
{
    private readonly AppDbContext cs;
    public AlertController(AppDbContext context) => cs = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<alertdto>>> GetAlerts()
    {
        return await cs.Alerts
            .Select(a => new alertdto
            {
                Id = a.Id,
                CitizenId = a.CitizenId,
                Message = a.Message,
                DisasterType = a.DisasterType,
                Region = a.Region,
                AlertTime = a.AlertTime
            })
            .ToListAsync();
    }

    // GET: api/Alert/5
    [HttpGet("{id}")]
    public async Task<ActionResult<alertdto>> GetAlert(int id)
    {
        var alert = await cs.Alerts.FindAsync(id);
        if (alert == null)
            return NotFound();

        var dto = new alertdto
        {
            Id = alert.Id,
            CitizenId = alert.CitizenId,
            Message = alert.Message,
            DisasterType = alert.DisasterType,
            Region = alert.Region,
            AlertTime = alert.AlertTime
        };

        return dto;
    }

    // POST: api/Alert
    [HttpPost]
    public async Task<ActionResult<alertdto>> PostAlert(alertdto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var citizenExists = await cs.Citizens.AnyAsync(c => c.Id == dto.CitizenId);
        if (!citizenExists)
            return NotFound($"Citizen with ID {dto.CitizenId} does not exist.");

        var alert = new Alert
        {
            CitizenId = dto.CitizenId,
            Message = dto.Message,
            DisasterType = dto.DisasterType,
            Region = dto.Region,
            AlertTime = dto.AlertTime
        };

        cs.Alerts.Add(alert);
        await cs.SaveChangesAsync();

        dto.Id = alert.Id;

        return CreatedAtAction(nameof(GetAlert), new { id = alert.Id }, dto);
    }

    // PUT: api/Alert/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAlert(int id, alertdto dto)
    {
        if (id != dto.Id)
            return BadRequest("ID mismatch.");

        var alert = await cs.Alerts.FindAsync(id);
        if (alert == null)
            return NotFound();

        var citizenExists = await cs.Citizens.AnyAsync(c => c.Id == dto.CitizenId);
        if (!citizenExists)
            return NotFound($"Citizen with ID {dto.CitizenId} does not exist.");

        alert.CitizenId = dto.CitizenId;
        alert.Message = dto.Message;
        alert.DisasterType = dto.DisasterType;
        alert.Region = dto.Region;
        alert.AlertTime = dto.AlertTime;

        cs.Entry(alert).State = EntityState.Modified;
        await cs.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Alert/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAlert(int id)
    {
        var alert = await cs.Alerts.FindAsync(id);
        if (alert == null)
            return NotFound();

        cs.Alerts.Remove(alert);
        await cs.SaveChangesAsync();

        return NoContent();
    }
}
