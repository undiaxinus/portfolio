# Portfolio Website with 3D Globe Visualization

A modern, responsive portfolio website built with Angular 17, featuring an interactive 3D globe for visualizing visitor locations worldwide.

## 🌟 Features

### Core Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Automatic theme switching with user preference
- **Portfolio Showcase**: Projects, skills, and experience display
- **Contact Form**: Integrated contact functionality
- **Admin Dashboard**: Visitor analytics and management

### 🗺️ Map Visualization
- **Interactive 2D Map**: Real-time visitor tracking with detailed location markers
- **Real-time Visitor Tracking**: Live visitor locations with country flags
- **Theme Integration**: Map adapts to website's dark/light theme
- **Smooth Navigation**: Pan, zoom, and explore visitor locations

### Analytics & Tracking
- **Visitor Geolocation**: Track visitor locations worldwide
- **Real-time Statistics**: Live visitor count and analytics
- **Data Export**: Export visitor data for analysis
- **Supabase Integration**: Secure data storage and management

## 🚀 Technologies Used

### Frontend
- **Angular 17**: Latest Angular framework with standalone components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **RxJS**: Reactive programming for data handling

### Map Visualization
- **MapLibre GL JS**: Modern 2D mapping library
- **Interactive Controls**: Smooth pan and zoom functionality

### Backend & Database
- **Supabase**: Backend-as-a-Service with PostgreSQL
- **Real-time Subscriptions**: Live data updates
- **Authentication**: Secure admin access

### Deployment
- **Firebase Hosting**: Fast, secure web hosting
- **Angular Universal**: Server-side rendering (SSR)
- **Progressive Web App (PWA)**: Offline capabilities

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Modern browser with WebGL support

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment template
   cp src/environments/environment.example.ts src/environments/environment.ts
   
   # Update with your Supabase credentials
   # Edit src/environments/environment.ts
   ```

4. **Start development server**
   ```bash
   ng serve
   ```

5. **Open browser**
   Navigate to `http://localhost:4200`

## 🗺️ Map Setup

The map visualization feature configuration:

### MapLibre GL JS Configuration
- Map styles and sources are configured in the map service
- Modern browser support for optimal performance

### Browser Requirements
- **Chrome**: Version 60+
- **Firefox**: Version 55+
- **Safari**: Version 12+
- **Edge**: Version 79+

## 🎯 Usage

### Viewing the Map
1. Navigate to the Admin panel
2. Click "Show Visualization"
3. Interact with the map:
   - **Drag**: Pan around the map
   - **Scroll**: Zoom in/out
   - **Click markers**: View visitor details

### Admin Features
- **Real-time Monitoring**: Watch visitors in real-time
- **Data Management**: Export and clear visitor data
- **Theme Control**: Switch between dark/light modes
- **Analytics**: View visitor statistics and trends

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Angular components
│   │   ├── admin/          # Admin dashboard
│   │   ├── portfolio/      # Portfolio showcase
│   │   └── header/         # Navigation header
│   ├── services/           # Angular services
│   │   ├── map.service.ts      # Map management
│   │   ├── visitor-tracking.service.ts
│   │   └── theme.service.ts
│   └── pipes/              # Custom pipes
├── assets/                 # Static assets
├── environments/           # Environment configurations
└── styles.css             # Global styles
```

## 🔧 Configuration

### Environment Variables
```typescript
export const environment = {
  production: false,
  supabaseUrl: 'your-supabase-url',
  supabaseAnonKey: 'your-supabase-anon-key',
  ipGeolocationApiKey: 'your-ip-geolocation-key'
};
```

### Supabase Setup
1. Create a Supabase project
2. Run the SQL setup script: `supabase-setup.sql`
3. Configure Row Level Security (RLS)
4. Update environment variables

## 🚀 Deployment

### Firebase Hosting
```bash
# Build for production
ng build --configuration production

# Deploy to Firebase
firebase deploy
```

### Other Platforms
The application can be deployed to:
- **Vercel**: Zero-config deployment
- **Netlify**: Continuous deployment
- **AWS S3**: Static website hosting
- **GitHub Pages**: Free hosting for public repos

## 🎨 Customization

### Themes
- Modify `src/app/services/theme.service.ts`
- Update Tailwind configuration in `tailwind.config.js`
- Customize globe themes in `src/app/services/globe.service.ts`

### Map Appearance
- **Map Styles**: Change base map tiles and styling
- **Marker Styles**: Customize visitor markers
- **View Settings**: Adjust default map position and zoom

## 📊 Performance

### Optimization Features
- **Lazy Loading**: Components load on demand
- **OnPush Strategy**: Optimized change detection
- **Asset Optimization**: Compressed images and assets
- **Code Splitting**: Reduced initial bundle size
- **Service Workers**: Caching and offline support

### Map Performance
- **Efficient Rendering**: Optimized map tile loading
- **Marker Clustering**: Group nearby markers
- **Memory Management**: Proper cleanup on view changes

## 🐛 Troubleshooting

### Common Issues

1. **Map not loading**
   - Check internet connection
   - Clear browser cache and reload
   - Verify map service configuration

2. **Performance issues**
   - Close unnecessary browser tabs
   - Update graphics drivers
   - Reduce browser zoom level

3. **Build errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Update Angular CLI: `npm install -g @angular/cli@latest`
   - Check Node.js version compatibility

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MapLibre**: For the excellent mapping technology
- **Angular Team**: For the robust framework
- **Supabase**: For the excellent backend services
- **Tailwind CSS**: For the utility-first CSS framework
- **Community**: For inspiration and support

## 📞 Contact

- **Developer**: Jamz
- **Email**: [your-email@example.com]
- **Portfolio**: [your-portfolio-url]
- **GitHub**: [your-github-profile]

---

**Made with ❤️ using Angular 17 and MapLibre GL JS**