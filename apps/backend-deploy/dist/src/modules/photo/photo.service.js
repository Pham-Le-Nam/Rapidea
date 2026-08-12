"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const course_service_1 = require("../course/course.service");
let PhotoService = class PhotoService {
    photoRepo;
    courseService;
    constructor(photoRepo, courseService) {
        this.photoRepo = photoRepo;
        this.courseService = courseService;
    }
    rootFolder = process.env.STORAGE_URL || 'storage';
    mediaFolder = 'media';
    async uploadPhoto(file, userId) {
        if (!file) {
            throw new common_1.NotFoundException('Photo file not found');
        }
        if (!file.mimetype.startsWith('image/')) {
            throw new common_1.InternalServerErrorException('Only image files can be uploaded');
        }
        const extension = this.getExtension(file);
        const photo = await this.photoRepo.create(userId, extension);
        if (!photo) {
            throw new common_1.InternalServerErrorException("Couldn't create photo");
        }
        const mediaPath = path.join(process.cwd(), this.rootFolder, this.mediaFolder);
        await fs.mkdir(mediaPath, { recursive: true });
        await fs.writeFile(path.join(mediaPath, photo.name), file.buffer);
        return {
            ...photo,
            photoUrl: photo.name,
        };
    }
    async getPhotoById(id) {
        const photo = await this.photoRepo.findById(id);
        if (!photo) {
            throw new common_1.NotFoundException('Photo not found');
        }
        return {
            ...photo,
            photoUrl: photo.name,
        };
    }
    async uploadCourseThumbnail(file, userId, courseId) {
        const photo = await this.uploadPhoto(file, userId);
        const course = await this.courseService.updateCourse(courseId, userId, undefined, undefined, undefined, undefined, photo.id);
        return {
            photo,
            course,
        };
    }
    getExtension(file) {
        const extension = path.extname(file.originalname).replace('.', '').toLowerCase();
        if (extension) {
            return extension;
        }
        return file.mimetype.split('/')[1] || 'jpg';
    }
};
exports.PhotoService = PhotoService;
exports.PhotoService = PhotoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PHOTO_REPOSITORY')),
    __metadata("design:paramtypes", [Object, course_service_1.CourseService])
], PhotoService);
//# sourceMappingURL=photo.service.js.map