<?php

namespace App\Policies\Programs;

use App\Models\Course;
use App\Models\Programs\Material;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class MaterialPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewMaterialList(User $user, Course $course): bool
    {
        // Check if user is an admin
        $isAdmin = $user->role->role_name == "admin";
        // If not check whether the user was assigned to the course
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->course_id);
        })->exists();

        $isAuthorized = $isAdmin || $isCourseAssigned;

        return $isAuthorized;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function viewMaterial(User $user, Material $material, Course $course): bool
    {
        $isAdmin = $user->role->role_name == "admin";
        $isAuthor = $material->created_by === $user->user_id;
        $isPublished = $material->status === "published";
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->course_id);
        })->exists();

        $isAuthorized = ($isAdmin && ($isAuthor || $isPublished)) || ($isCourseAssigned && ($isAuthor || $isPublished));

        return $isAuthorized;
    }

    /**
     * Determine whether the user can create models.
     */
    public function createMaterial(User $user, Course $course): bool
    {
        $isAdmin = $user->role->role_name == "admin";
        $isFaculty = $user->role->role_name === 'faculty';
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->course_id);
        })->exists();

        $isAuthorized = $isAdmin  || ($isFaculty && $isCourseAssigned);
        return  $isAuthorized;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function updateMaterial(User $user, Material $material): bool
    {
        $isAuthor = $material->created_by === $user->user_id;
        return  $isAuthor;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function archiveMaterial(User $user, Material $material): bool
    {
        $isAuthor = $material->created_by === $user->user_id;
        return  $isAuthor;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restoreMaterial(User $user, string $materialId): bool
    {
        // Get the instace of model since model binding
        // is not working for soft deleted data
        $material = Material::withTrashed()->findOrFail($materialId);

        $isAuthor = $material->created_by === $user->user_id;

        return  $isAuthor;
    }

    /**
     * Determine whether the user can view material file.
     */
    public function viewMaterialFile(User $user, Material $material, Course $course): bool
    {
        // User can view the file if he is an admin and author of the material or the material was published
        // If not admin to view the file the course should be assigned to the user and the author of the material or the material was published
        $isAdmin = $user->role->role_name == "admin";
        $isAuthor = $material->created_by === $user->user_id;
        $isPublished = $material->status === "published";
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->course_id);
        })->exists();

        $isAuthorized = ($isAdmin && ($isAuthor || $isPublished)) || ($isCourseAssigned && ($isAuthor || $isPublished));

        return $isAuthorized;
    }

    public function downloadMaterialFile(User $user, Material $material, Course $course): bool
    {
        // User can download the file if he is an admin and author of the material or the material was published
        // If not admin to download the file the course should be assigned to the user and userr is a faculty and the author of the material or the material was published
        $isAdmin = $user->role->role_name == "admin";
        $isFaculty = $user->role->role_name == "faculty";
        $isAuthor = $material->created_by === $user->user_id;
        $isPublished = $material->status === "published";
        $isCourseAssigned = $user->programs()->whereHas('courses', function ($query) use ($course) {
            $query->where('course_id', $course->course_id);
        })->exists();

        $isAuthorized = ($isAdmin && ($isAuthor || $isPublished)) || ($isFaculty && $isCourseAssigned && ($isAuthor || $isPublished));

        return $isAuthorized;
    }
}
