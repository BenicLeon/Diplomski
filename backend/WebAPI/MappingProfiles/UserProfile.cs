using AutoMapper;
using Model;
using WebAPI.DTOs.User;

namespace WebAPI.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<CreateUserDTO, User>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid()))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(_ => "User"))
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .AfterMap((src, dest) =>
                {
                    if (!string.IsNullOrWhiteSpace(src.Password))
                    {
                        dest.PasswordHash = BCrypt.Net.BCrypt.HashPassword(src.Password);
                    }
                });

        }
    }

}
