<template>
<table class="table table-sm">
  <thead>
    <tr>
      <th scope="col">District</th>
      <th scope="col">Sub-county</th>
      <th scope="col">MAIZE</th>
      <th scope="col">EARLY SORGHUM rainfed</th>
      <th scope="col">LATE SORGHUM</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Abim</th>
      <td>Morulem</td>
      <td>0.9885</td>
      <td>1.6110</td>
      <td>1.8400</td>
    </tr>
    <tr>
      <th scope="row">Kaabong</th>
      <td>Karenga</td>
      <td>2.2540</td>
      <td>1.9017</td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">Kaabong</th>
      <td>Loyoro</td>
      <td>0.4928</td>
      <td>1.3866</td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">Napak</th>
      <td>Matany</td>
      <td>0.45</td>
      <td>2.0060</td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">Napak</th>
      <td>Ngoleriet</td>
      <td>0.2842</td>
      <td>2.3154</td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">Napak</th>
      <td>Lopei</td>
      <td></td>
      <td>0.9853</td>
      <td></td>
    </tr>
  </tbody>
</table>
</template>

<script>

export default {
  name: 'WidgetTable',
  props: [
    'area',
    'parameter'
  ]
}
</script>
