export const convertImageBlobToUrl = (bytes) => {
    const blob = new Blob([new Uint8Array(bytes)], { type: 'image/jpeg' }); // Assuming JPEG image
    const url = URL.createObjectURL(blob);

    return url
}