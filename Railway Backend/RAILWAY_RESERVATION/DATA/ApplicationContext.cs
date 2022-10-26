global using Microsoft.EntityFrameworkCore;
global using RAILWAY_RESERVATION.Models;


namespace RAILWAY_RESERVATION.DATA
{
    public class ApplicationContext:DbContext
    {

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {



        }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Booking> Bookings { get; set; }

        public DbSet<Train> Trains { get; set; }


        public DbSet<Passenger> Passengers { get; set; }

        public DbSet<Payment> Payments { get; set; }




    }
}
