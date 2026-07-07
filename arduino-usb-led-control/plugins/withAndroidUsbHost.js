const { withAndroidManifest } = require('@expo/config-plugins');

// Expo config plugin that adds the Android USB host feature and the USB attach intent.
module.exports = function withAndroidUsbHost(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    const application = manifest.application?.[0];

    if (!application) {
      return config;
    }

    const existingFeatures = manifest['uses-feature'] || [];
    const hasUsbFeature = existingFeatures.some(
      (item) => item.$?.['android:name'] === 'android.hardware.usb.host'
    );

    if (!hasUsbFeature) {
      manifest['uses-feature'] = [
        ...existingFeatures,
        {
          $: {
            'android:name': 'android.hardware.usb.host',
            'android:required': 'false',
          },
        },
      ];
    }

    const activities = application.activity || [];
    for (const activity of activities) {
      const intentFilters = activity['intent-filter'] || [];
      const hasAttachedFilter = intentFilters.some((filter) =>
        (filter.action || []).some(
          (action) => action.$?.['android:name'] === 'android.hardware.usb.action.USB_DEVICE_ATTACHED'
        )
      );

      if (!hasAttachedFilter) {
        activity['intent-filter'] = [
          ...intentFilters,
          {
            action: [
              {
                $: {
                  'android:name': 'android.hardware.usb.action.USB_DEVICE_ATTACHED',
                },
              },
            ],
            category: [
              {
                $: {
                  'android:name': 'android.intent.category.DEFAULT',
                },
              },
            ],
          },
        ];
      }
    }

    return config;
  });
};
