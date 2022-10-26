using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RAILWAY_RESERVATION.Migrations;
using RAILWAY_RESERVATION.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Xml.Linq;

namespace RAILWAY_RESERVATION.Controllers
{

    [ApiController]
    [Route("api/User")]
    public class UserController : Controller
    {
        private readonly ApplicationContext dbContext;
        public IConfiguration _configuration;
        public UserController(ApplicationContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            _configuration = configuration;
        }


        [HttpPost]
        [Route ("{userLoginId}/{userName}/{password}/{contactNo}/{email}/{address}") ]
        public IActionResult UserRegistration(string userLoginId, string userName, string password,long contactNo, string email, string address)
        {
            var u = new User()
            {
                UserLoginId = userLoginId,
                UserName =userName,
                Password = password,
                ContactNo = contactNo,
                Email = email,
                Address = address
            };

            dbContext.Users.Add(u);
            dbContext.SaveChanges();

            return Ok(u);

        }

        /*
        [HttpGet]
        [Route("{userloginId}/{password}")]
        public IActionResult UserLogin( string userloginId , string password)
        {
            var present = dbContext.Users.Where(x => x.UserLoginId == userloginId && x.Password == password);


            if(present != null)
            {
                return Ok(present);
            }
            return BadRequest();

        }



        */



        [HttpPost]
        [Route("{loginId}/{password}")]
        public async Task<IActionResult> Post(string loginId, string password)
        {
            if (loginId != null && password != null)
            {
                var userData = await GetUser(loginId, password);
                var jwt = _configuration.GetSection("Jwt").Get<Jwt>();
                if (userData != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Id", loginId),
                       
                        new Claim("Password", password)

                    };
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.key));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                       jwt.Issuer,
                       jwt.Audience,
                        claims,
                        expires: DateTime.Now.AddMinutes(20),
                        signingCredentials: signIn
                    );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                    return Json(tokenString);
                    //   var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                   // return Json(tokenString);
                }
                else
                {
                    return BadRequest("Invalid Credentials");
                }


            }
            else
            {
                return BadRequest("Invalid Credentials");
            }
        }
        [HttpGet]
        public async Task<User> GetUser(string username, string password)
        {
            return await dbContext.Users.FirstOrDefaultAsync(u => u.UserLoginId == username && u.Password == password);
        }





    }
}
