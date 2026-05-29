$email = "talkalisker@gmail.com"
$name = "Tal Kalisker"
$pfxPath = "c:\Users\talka\Desktop\talkalisker.com\talkalisker.pfx"
$password = "TalKalisker2026!"

# Convert password to SecureString
$secPassword = ConvertTo-SecureString $password -AsPlainText -Force

try {
    # Create self-signed certificate for S/MIME (Email Protection)
    # EKU OID: 2.5.29.37 -> Secure Email (1.3.6.1.5.5.7.3.4)
    # SAN OID: 2.5.29.17 -> email=talkalisker@gmail.com
    $cert = New-SelfSignedCertificate -Subject "CN=$name, E=$email" `
                                      -Type Custom `
                                      -KeySpec Signature `
                                      -KeyUsage DigitalSignature,KeyEncipherment `
                                      -SmimeCapabilities `
                                      -TextExtension @(
                                          "2.5.29.37={text}1.3.6.1.5.5.7.3.4",
                                          "2.5.29.17={text}email=$email"
                                      ) `
                                      -CertStoreLocation "Cert:\CurrentUser\My" `
                                      -NotAfter (Get-Date).AddYears(2)

    # Export to PFX
    Export-PfxCertificate -Cert $cert -FilePath $pfxPath -Password $secPassword

    # Clean up from local temporary store (the user will import the PFX file themselves when setting up their mail client)
    Remove-Item "Cert:\CurrentUser\My\$($cert.Thumbprint)"

    Write-Output "SUCCESS: PFX Certificate successfully generated at $pfxPath"
} catch {
    Write-Error "Failed to generate certificate: $_"
}
