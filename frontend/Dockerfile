# שלב 1: Build
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# שלב 2: שרת Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# העתקת קובץ הקונפיגורציה שלנו שדורס את ברירת המחדל
COPY nginx.conf /etc/nginx/nginx.conf

# פתרון קסם ל-OpenShift: הענקת הרשאות כתיבה (w) לקבוצה 0 בתיקיות הליבה של Nginx
RUN chown -R 101:0 /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    chmod -R g+rwX /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]