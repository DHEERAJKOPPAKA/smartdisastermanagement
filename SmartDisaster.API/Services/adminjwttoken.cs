using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SmartDisaster.API.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SmartDisaster.API.Services
{
    public class adminjwttoken
    {
        public readonly AppDbContext cs;
        public readonly IConfiguration ic;
        public adminjwttoken(AppDbContext cs, IConfiguration ic)
        {
            this.cs = cs;
            this.ic = ic;
        }

        public async Task<string> Authenticate(LoginRequestdto req)
        {
            if (string.IsNullOrWhiteSpace(req.email) || string.IsNullOrWhiteSpace(req.password))
                return null;

            var userinfo = await cs.Admins.FirstOrDefaultAsync(s => s.Email == req.email);
            if (userinfo == null || userinfo.Password != req.password) // Replace with hashed comparison
                return null;

            // Create claims from user info
            var claims = new[]
            {
    new Claim(JwtRegisteredClaimNames.Sub, userinfo.Email),
    new Claim("UserId", userinfo.Id.ToString()),
    new Claim("FirstName", userinfo.FullName),
    new Claim("LastName", userinfo.Email),
    new Claim("Phone", userinfo.Region ?? ""),

};

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ic["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            var token = new JwtSecurityToken(
                issuer: ic["Jwt:Issuer"],
                audience: ic["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(120),
                signingCredentials: creds);

            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;
        }
    }
}
