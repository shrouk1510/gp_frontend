export const convertImageBytesToUrl = (bytes) => {
    // const blob = new Blob([new Uint8Array(bytes)], { type: 'image/jpeg' }); // Assuming JPEG image
    // const url = URL.createObjectURL(blob);
    const url = `data:image/jpeg;base64,${bytes}`

    return url
}