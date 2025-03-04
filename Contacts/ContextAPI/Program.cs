var builder =WebApplication.CreateBuilder(args);//create web application build
builder.Services.AddEndpointsApiExplorer(); //for exploring api from external client
builder.Services.AddSwaggerGen();// for testing api from UI
builder.Services.AddControllers(); //for adding controllers for back end processing in application

var app=builder.Build(); //build applications

//configurre environment for application
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();//for showing exception page in  browser
    app.UseSwagger(); //permitting to use swagger
    app.UseSwaggerUI(); //for showing swagger UI in browser
}
app.UseHttpsRedirection(); //for redirecting http to https request
app.UseAuthorization(); //for authorization of user
app.MapControllers();  //for mapping controller endpoints
app.UseRouting(); //for routing of request
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()); //for allowing cross origin
app.MapGet("/",() =>"Contactss page application");//index page of application
app.Run();//run application