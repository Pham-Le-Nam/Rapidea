CREATE TYPE "TranscriptStatus" AS ENUM ('NOT_REQUESTED', 'PROCESSING', 'COMPLETED', 'FAILED');

CREATE TABLE "file_transcript" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "status" "TranscriptStatus" NOT NULL DEFAULT 'NOT_REQUESTED',
    "text" TEXT,
    "language" TEXT,
    "durationSec" INTEGER,
    "provider" TEXT,
    "model" TEXT,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "file_transcript_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "embedding" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "course_tag" (
    "courseId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "isSuggested" BOOLEAN NOT NULL DEFAULT false,
    "score" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "post_tag" (
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "isSuggested" BOOLEAN NOT NULL DEFAULT false,
    "score" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "file_tag" (
    "fileId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "isSuggested" BOOLEAN NOT NULL DEFAULT true,
    "score" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "file_transcript_fileId_key" ON "file_transcript"("fileId");
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");
CREATE UNIQUE INDEX "course_tag_courseId_tagId_key" ON "course_tag"("courseId", "tagId");
CREATE INDEX "course_tag_tagId_idx" ON "course_tag"("tagId");
CREATE UNIQUE INDEX "post_tag_postId_tagId_key" ON "post_tag"("postId", "tagId");
CREATE INDEX "post_tag_tagId_idx" ON "post_tag"("tagId");
CREATE UNIQUE INDEX "file_tag_fileId_tagId_key" ON "file_tag"("fileId", "tagId");
CREATE INDEX "file_tag_tagId_idx" ON "file_tag"("tagId");

ALTER TABLE "file_transcript" ADD CONSTRAINT "file_transcript_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "course_tag" ADD CONSTRAINT "course_tag_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "course_tag" ADD CONSTRAINT "course_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "post_tag" ADD CONSTRAINT "post_tag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "post_tag" ADD CONSTRAINT "post_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "file_tag" ADD CONSTRAINT "file_tag_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "file_tag" ADD CONSTRAINT "file_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "tag" ("id", "name")
SELECT md5(name), name
FROM unnest(ARRAY[
    'javascript','typescript','python','java','csharp','cplusplus','c','go','rust','php',
    'ruby','swift','kotlin','dart','scala','r','matlab','sql','html','css',
    'react','nextjs','vue','nuxt','angular','svelte','nodejs','nestjs','expressjs','fastify',
    'django','flask','fastapi','spring-boot','dotnet','laravel','rails','graphql','rest-api','grpc',
    'web-development','frontend','backend','full-stack','mobile-development','ios','android','react-native','flutter','electron',
    'database-design','postgresql','mysql','mongodb','redis','sqlite','prisma','typeorm','sequelize','migrations',
    'data-structures','algorithms','leetcode','system-design','design-patterns','object-oriented-programming','functional-programming','clean-code','refactoring','testing',
    'unit-testing','integration-testing','end-to-end-testing','jest','vitest','playwright','cypress','debugging','performance','security',
    'authentication','authorization','oauth','jwt','api-design','microservices','event-driven-architecture','message-queues','kafka','rabbitmq',
    'docker','kubernetes','devops','ci-cd','github-actions','gitlab-ci','terraform','aws','azure','google-cloud',
    'linux','bash','powershell','git','github','networking','http','websockets','cloud-computing','serverless',
    'machine-learning','deep-learning','artificial-intelligence','generative-ai','llm','prompt-engineering','computer-vision','natural-language-processing','reinforcement-learning','data-science',
    'data-analysis','data-visualization','pandas','numpy','scikit-learn','tensorflow','pytorch','keras','statistics','probability',
    'linear-algebra','calculus','discrete-math','mathematics','physics','chemistry','biology','anatomy','medicine','nursing',
    'public-health','psychology','sociology','philosophy','history','geography','economics','finance','accounting','business',
    'marketing','sales','entrepreneurship','product-management','project-management','agile','scrum','leadership','communication','public-speaking',
    'writing','academic-writing','research-methods','literature-review','critical-thinking','study-skills','exam-preparation','language-learning','english','ielts',
    'toefl','spanish','french','german','japanese','korean','chinese','vietnamese','music-theory','guitar',
    'piano','audio-production','video-editing','photography','graphic-design','ui-design','ux-design','figma','adobe-photoshop','adobe-illustrator',
    'blender','3d-modeling','game-development','unity','unreal-engine','godot','blockchain','web3','smart-contracts','solidity',
    'cybersecurity','ethical-hacking','penetration-testing','cryptography','digital-forensics','it-support','computer-hardware','operating-systems','compiler-design','embedded-systems',
    'arduino','raspberry-pi','internet-of-things','robotics','electrical-engineering','mechanical-engineering','civil-engineering','cad','autocad','solidworks'
]::text[]) AS tags(name)
ON CONFLICT ("name") DO NOTHING;
