import express, { application } from "express";
import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

const app = express();

app.use(express.json());

const port = 7000;

app.get("/pengusaha", async (req, res) => {
    try {
        const pengusaha = await database.pengusaha.findMany();
        if (!pengusaha) throw new Error("Pengusaha tidak ada");
        res.send(pengusaha);
    }catch (err) {
        res.send({ status: 404, message });
    }
});

app.get("/pengusaha/:id", async (req, res) => {
    try {
        const pengusaha = await database.pengusaha.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        if (!pengusaha) throw new Error("pengusaha tidak ditemukan");

        res.send(pengusaha);
    } catch (err) {
        res.send({ status: 404, message: err.message });
    }
});

app.post("/pengusaha/create", async (req, res) => {
    try {
        const pengusaha = await database.pengusaha.create({
            data: {
                name: req.body.name,
                company: req.body.company,
                address: req.body.address,
                description: req.body.description,
            },
        });
        res.send({ message: "Data Pengusaha Berhasil di buat", data: pengusaha });
    } catch (err) {}
});

app.put("/pengusaha/update", async (req, res) => {
    try {
        const pengusaha = await database.pengusaha.update({
            where: {
                id: req.body.id,
            },
            data: {
                name: req.body.name,
                company: req.body.company,
                address: req.body.address,
                description: req.body.description,  
            },
        });
        res.send({ message: "Data Pengusaha Berhasil di update", data: pengusaha });
    } catch (err) {}
});

app.delete("/pengusaha/delete", async (req, res) => {
    await database.pengusaha.delete({
        where: {
            id: req.body.id,
        },
    });
    res.send({ message: "Data Pengusaha Berhasil di hapus" });
});

app.listen(port, () => {
    console.log(`Alpkasi nya jalan di port ${port}`);
});