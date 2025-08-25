using AutoMapper;
using Model;
using WebAPI.DTOs.Auth;
using WebAPI.DTOs.User;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebAPI.MappingProfiles
{
    public class AuthProfile : Profile
    {
        public AuthProfile()
        {
            CreateMap<RegisterDTO, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<CreateUserDTO, User>().ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<UserDTO, User>().ForMember(dest => dest.Id, opt => opt.Ignore())
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
