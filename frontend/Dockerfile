# שלב 1: Build
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_URL=https://backend-api-jakeos-dev.apps.rm3.7wse.p1.openshiftapps.com/api/todos
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# שלב 2: Nginx ללא הרשאות (Unprivileged)
FROM nginxinc/nginx-unprivileged:alpine
# דריסת קובץ הניתוב של ברירת המחדל בקובץ שלנו
COPY default.conf /etc/nginx/conf.d/default.conf
# העתקת תוצרי ה-React
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080