class ClientMediaRepo {
  async upload(path: string, file: File | Blob): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`/api/media/${path}`, {
      method: "POST",
      body: formData,
    });

    const body = await res.json();
    return body.bucket_path;
  }
}

const clientMediaRepo = new ClientMediaRepo();
export default clientMediaRepo;
