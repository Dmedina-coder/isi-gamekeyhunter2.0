function AdBanner() {
  return (
    <div className="ad-banner">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3940256099942544" // ID de cliente de prueba
        data-ad-slot="1234567890" // ID de slot de prueba
        data-ad-format="auto"
      ></ins>
      <script>
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </script>
    </div>
  );
}

export default AdBanner;