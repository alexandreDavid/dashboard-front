export default {
  global: [
    {
      target: '.navbar-nav',
      content: 'Access the main navigation menu.'
    },
    {
      target: '.navbar-nav.nav-item.btn-group',
      content: 'Manage your profile here including preferred units of measurement and setting personalised notifications.'
    }
  ],
  dashboard: [
    {
      target: '#dashboard-list',
      content: 'Select a dashboard to display or add a new dashboard by clicking on this button'
    },
    {
      target: '#dashboard-actions',
      content: 'Manage the dashboard'
    },
    {
      target: '#dashboard-cards-actions',
      content: 'Manage the dasboard cards'
    }
  ],
  map: [
    {
      target: '#area-selection-control',
      content: 'Change the map area to search by district or place name or selecting a preferred area.'
    },
    {
      target: '#displayed-layers',
      content: 'Explore available data and manage the displayed layers. Click the "Tools" and “Play” icons to learn more about view and change settings for data layers on the map like date range, graph and opacity.'
    },
    {
      target: '#meteo-stations-control',
      content: 'View current and historical weather measurements collected from the ground at various meteorological stations.'
    },
    {
      target: '#bar-control',
      content: 'Access basic map tools and customize the basemap, including the boundaries displayed and the colour of the labels.',
      params: {
        placement: 'right'
      }
    }
  ]
}
