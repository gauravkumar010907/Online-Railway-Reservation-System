using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RAILWAY_RESERVATION.Controllers
{
    [ApiController]
    [Route("api/Admin")]
    public class AdminController : Controller
    {
        private readonly ApplicationContext dbContext;
        public IConfiguration _configuration;

        public AdminController(ApplicationContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            _configuration = configuration;
        }

        //[HttpGet]
        //[Route("{adminloginId}/{password}")]
        //public IActionResult AdminLogin(string adminloginId, string password)
        //{

        //    var present = dbContext.Admins.Where(x => x.AdminLoginId == adminloginId && x.Password == password);


        //    if (present != null)
        //    {
        //        return Ok(present);
        //    }

        //    return BadRequest();

        //}



        [HttpPost]
        [Route("{loginId}/{password}")]
        public async Task<IActionResult> Post(string loginId, string password)
        {
            if (loginId != null && password != null)
            {
                var userData = await GetAdmin(loginId, password);
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
        public async Task<Admin> GetAdmin(string adminloginid, string password)
        {
            return await dbContext.Admins.FirstOrDefaultAsync(u => u.AdminLoginId == adminloginid && u.Password == password);
        }

    }
}

//[httpPost]
//[route("{adminloginid}/{password}")]
//public async task<iactionresult> post(string adminloginid, string password)
//{
//    if (adminloginid != null && password != null)
//    {
//        var userdata = await getadmin(adminloginid, password);
//        var jwt = _configuration.getsection("jwt").get<jwt>();
//        if (userdata != null)
//        {
//            var claims = new[]
//            {
//                        new claim(jwtregisteredclaimnames.sub, jwt.subject),
//                        new claim(jwtregisteredclaimnames.jti, guid.newguid().tostring()),
//                        new claim(jwtregisteredclaimnames.iat, datetime.utcnow.tostring()),
//                        new claim("id", adminloginid),

//                        new claim("password", password)

//                    };
//            var key = new symmetricsecuritykey(encoding.utf8.getbytes(jwt.key));
//            var signin = new signingcredentials(key, securityalgorithms.hmacsha256);
//            var token = new jwtsecuritytoken(
//               jwt.issuer,
//               jwt.audience,
//                claims,
//                expires: datetime.now.addminutes(20),
//                signingcredentials: signin
//            );
//            var tokenstring = new jwtsecuritytokenhandler().writetoken(token);

//            return json(tokenstring);
//        }
//        else
//        {
//            return badrequest("invalid credentials");
//        }


//    }
//    else
//    {
//        return badrequest("invalid credentials");
//    }
//}
//[httpGet]
//public async task<admin> getadmin(string adminloginid, string password)
//{
//    return await dbcontext.admins.firstordefaultasync(u => u.adminloginid == adminloginid && u.password == password);
//}

//}

