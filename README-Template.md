TinyUrl Application

A Full-stack URL shortener application built on Azure cloud services with CI/CD automation.
•	Angular
•	ASP.NET Core Web API
•	Azure SQL Database
•	Azure Functions
•	Azure App Service
•	Azure DevOps CI/CD
•	Terraform
________________________________________
Features
•	Create short URLs
•	Redirect to original URLs
•	Search URLs
•	Delete expired URLs automatically
•	Create Azure resources using Terraform
•	Azure Function Timer Trigger cleanup job
•	CI/CD deployment using Azure DevOps
________________________________________
Frontend
•	Angular
•	App Service Url - tinyurlangular.azurewebsites.net
•	 
Backend

•	ASP.NET Core Web API
•	Entity Framework Core
API Url - tiny-url-api.azurewebsites.net

 
Database
•	Azure SQL Database
Cloud Services
•	Azure App Service
•	Azure Function App
Function Url - delete-rec-gqbaefhzbbghasew.australiaeast-01.azurewebsites.net

 
•	Azure Key Vault
DevOps
•	Azure DevOps Pipelines
________________________________________
Project Structure
TinyUrlApi/
│
|TinyUrlApi/          # ASP.NET Core API
|DataAccess/          # EF Core and repositories
|TriggerDBDelete/     # Azure Function cleanup job
| TinyUrlApi.sln
________________________________________
API Features
•	Generate short URL
•	Get all URLs
•	Redirect using short code
•	Delete records
________________________________________
Azure Function
A timer-triggered Azure Function deletes the URLs automatically.
Current timer schedule:
[TimerTrigger("0 0 */1 * * *")]
Runs every 1 hour.
________________________________________
Local Setup
Clone Repository
git clone
https://github.com/sathya444000/TinyUrlAngularRepo.git
https://github.com/sathya444000/TinyUrlApiRepo________________________________________
Backend Setup
cd TinyUrlApi
dotnet restore
dotnet run
________________________________________
Frontend Setup
cd tiny-url-angular
npm i
ng serve
________________________________________
Azure Deployment
Backend
Deployed to Azure App Service.
Frontend
Angular deployed to Azure App Service.
Function App
Azure Function App for cleanup jobs.
Terraform
________________________________________
Terraform used for Create Azure services 
•	Azure Resource Group
•	Azure Blob Storage
•	Azure Key Vault
•	Azure App Service

Terraform Url - https://github.com/sathya444000/TinyUrlTerraform.git

________________________________________
CI/CD
Azure DevOps pipelines used for:
•	Build
•	Test
•	Publish
•	Deploy
________________________________________
Security
Secrets are managed using:
•	Azure Key Vault - centralized secrets store. Used to save DB Connection string, Blob storage connection string.
•	Azure App Service Environment Variables
________________________________________
Author
Sathya M

