library(tidyverse)
data <- read.csv("C:/Users/navee/Desktop/Everything/Professional/DATA SCIENCE/Classwork/proj2-group-3/static/data/rstudio.csv")
view(data)
unique(data$Country)

USA <- data %>% filter(Country == 'United States')
CAN <- data %>% filter(Country == 'Canada')
UK <- data %>% filter(Country == 'United Kingdom')
AUS <- data %>% filter(Country == 'Australia')
GER <- data %>% filter(Country == 'Germany')
FR <- data %>% filter(Country == 'France')
BRA <- data %>% filter(Country == 'Brazil')
MEX <- data %>% filter(Country == 'Mexico')
SPA <- data %>% filter(Country == 'Spain')
ITA <- data %>% filter(Country == 'Italy')

model <- aov(Age ~ Age_Bins, data = ITA)
summary(model)
TukeyHSD(model)

ITA
